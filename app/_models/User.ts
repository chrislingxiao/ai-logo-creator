// 定义接口
export interface ILogo {
  image: string;
  title: string;
  desc: string;
  id: number;
  createdAt: Date;
}

export interface IUser {
  email: string;
  name: string;
  credits: number;
  logos: ILogo[];
}

export interface IRequestBody {
  userEmail: string;
  userName: string;
}
