export type postAdvisor = {
  id: string;
  detail: string;
  image: string;
  createAt: Date;
  editAt: Date;
  owner: {
    userId?: string;
    fname?: string;
    lname?: string;
    email?: string;
    image?: string;
  };
  comments?: {
    userId?: string;
    image?: string;
    fname?: string;
    lname?: string;
    detail?: string;
    createAt?: Date;
  }[];
};
