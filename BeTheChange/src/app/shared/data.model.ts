export interface Campaign {
  id: number,
  title: string,
  description: string,
  location: string,
  category: string,
  time: any,
  createdAt: any,
  quorum: number,
  image: string,
  creator: String,
  comments: Comment[]
}

export interface User {
  id: number,
  name: string,
  surname: string,
  email: string,
  password: string,
  profilePictureUrl: string,
  phone: string,
  address: string,
  favoriteCampaigns: Campaign[],
  joinedCampaigns: Campaign[]
}

export interface Comment {
  id: number,
  content: string,
  submitter: string,
  submissionTime: Date
}


