export interface ILogoDesign {
  title: string;
  image: string;
  prompt: string;
}

export interface IPriceOption {
  title: string;
  icon: string;
  features: string[];
  button: string;
}

export interface IFormData {
  title: string;
  desc: string;
  palette: string;
  design: ILogoDesign;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  idea: string;
  price: IPriceOption;
}
