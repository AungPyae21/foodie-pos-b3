interface Config {
  googleClientID: string;
  gooleClientSecret: string;
}
export const config: Config = {
  googleClientID: process.env.GOOGLE_CLIENT_ID as string,
  gooleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
};
