const firebaseConfig = {
  // This is a hack, because for some reason that I'm not fully understand, if you remove the concatenation from the env variables
  // you will get an error with the API key, but if you console log this object (without the concatenation) and put it directally in the function call it will work!!
  // JS in a nutshell :)
  apiKey: `${process.env.NEXT_PUBLIC_FB_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_FB_PROJECT_ID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID}`,
  appId: `${process.env.NEXT_PUBLIC_FB_APP_ID}`,
};

export { firebaseConfig };
