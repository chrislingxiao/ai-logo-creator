interface TitleDescriptionProps {
  title: string;
  description: string;
}

const TitleDescription = ({ title, description }: TitleDescriptionProps) => {
  return (
    <div>
      <h2 className='text-3xl font-bold text-pink-400'>{title}</h2>
      <p className='text-lg text-gray-500'>{description}</p>
    </div>
  );
};

export default TitleDescription;
