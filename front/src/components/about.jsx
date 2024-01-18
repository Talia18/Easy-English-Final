import PageHeader from "./common/pageHeader";

const About = () => {
  const ABOUT_DESCRIPTION =
    "EasyEnglish is a place to learn english for all levels. My group and I researched the topic and came to the conclusion that there is no convenient and easy platform to learn English, and this is where our inspiration came from. You can practice your english everywhere and anytime and get score. The score will enter to the leaderboard, and if you will endeavor you will get in - so do your best ! The consept is simple: choose your practice level and just start ! Have fun !";
  return (
    <PageHeader
      title={<div>About us...</div>}
      description={ABOUT_DESCRIPTION}
    />
  );
};

export default About;
