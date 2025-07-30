import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import Replicate from 'replicate';
import sharp from 'sharp';
import { AILogoPrompt } from '@/app/config/AIModel';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/config/FirebaseConfig';

const maxDuration = 300;
const POST = async (req: NextRequest) => {
  const { prompt, email, title, desc, type, userCredits } = await req.json();
  let base64ImageWithMime = '';

  try {
    const AIPromptRes = await AILogoPrompt.sendMessage({ message: prompt });

    const AIPrompt = JSON.parse(AIPromptRes.text || '{}').prompt;

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    if (type === 'Free') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const output: any = await replicate.run(
        'bytedance/hyper-flux-8step:16084e9731223a4367228928a6cb393b21736da2a0ca6a5a492ce311f0a97143',
        {
          input: {
            prompt: AIPrompt,
            num_outputs: 1,
            aspect_ratio: '1:1',
            output_format: 'png',
            guidance_scale: 3.5,
            output_quality: 80,
            num_inference_steps: 8,
          },
        }
      );

      base64ImageWithMime = await ConvertImageToBase64(output[0].url());
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const output: any = await replicate.run(
        'stability-ai/stable-diffusion-3.5-large',
        {
          input: {
            prompt: AIPrompt,
            num_outputs: 1,
            aspect_ratio: '1:1',
            output_format: 'png',
            guidance_scale: 3.5,
            output_quality: 80,
            num_inference_steps: 8,
          },
        }
      );

      base64ImageWithMime = await ConvertImageToBase64(output[0].url());

      const docRef = doc(db, 'users', email);
      await updateDoc(docRef, {
        credits: Number(userCredits) - 1,
      });
    }

    try {
      await setDoc(doc(db, 'users', email, 'logos', Date.now().toString()), {
        image: base64ImageWithMime,
        title,
        desc,
        id: Date.now(),
      });
    } catch (error) {}
    return NextResponse.json({ image: base64ImageWithMime });
  } catch (error) {
    return NextResponse.json({ error });
  }
};

const ConvertImageToBase64 = async (imageUrl: string) => {
  const { data } = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const compressedImageBuffer = await sharp(data)
    .resize({ width: 700 })
    .jpeg({ quality: 80 })
    .toBuffer();

  return `data:image/jpeg;base64,${compressedImageBuffer.toString('base64')}`;
};

export { POST, maxDuration };
