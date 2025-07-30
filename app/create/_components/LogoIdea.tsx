'use client';

import LookUp from '@/app/_data/Lookup';
import TitleDescription from './TitleDescription';
import { useState, useEffect } from 'react';
import { IFormData } from '@/app/_types/types';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import { Prompt } from '@/app/_data/Prompt';

interface LogoIdeaProps {
  formData: IFormData;
  onInputChange: (value: string) => void;
}

const LogoIdea = ({ formData, onInputChange }: LogoIdeaProps) => {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(formData?.idea);

  useEffect(() => {
    generateLogoIdea();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateLogoIdea = async () => {
    setLoading(true);
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
      '{logoType}',
      formData?.design.title
    )
      .replace('{logoTitle}', formData?.title)
      .replace('{logoDesc}', formData?.desc)
      .replace('{logoPrompt}', formData?.design?.prompt);

    const result = await axios.post('/api/ai-design-ideas', { prompt: PROMPT });
    if (result.data.ideas.length) {
      setIdeas(result.data.ideas);
    }
    setLoading(false);
  };

  const handleInputChange = (idea: string) => {
    setSelected(idea);
    onInputChange(idea);
  };

  return (
    <div className='my-10'>
      <TitleDescription
        title={LookUp.LogoDesignTitle}
        description={LookUp.LogoDesignDesc}
      ></TitleDescription>
      <div className='flex items-center justify-center'>
        {loading && <Loader2Icon className='my-10 animate-spin' />}
      </div>
      <div className='mt-6 flex flex-wrap gap-3'>
        {ideas &&
          ideas.map((idea, idx) => (
            <h2
              key={idx}
              className={`cursor-pointer rounded-full border p-2 px-3 hover:border-pink-500 ${selected === idea && 'border-pink-500 bg-pink-500 text-white'}`}
              onClick={() => handleInputChange(idea)}
            >
              {idea}
            </h2>
          ))}
        <h2
          className={`cursor-pointer rounded-full border p-2 px-3 hover:border-pink-500 ${selected === 'Let AI Select the best idea' && 'border-pink-500 bg-pink-500 text-white'}`}
          onClick={() => handleInputChange('Let AI Select the best idea')}
        >
          Let AI Select the best idea
        </h2>
      </div>
    </div>
  );
};

export default LogoIdea;
