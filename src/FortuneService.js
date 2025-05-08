const fortunes = [
  { text: "You will debug the un-debuggable.", category: "Techie" },
  { text: "Coffee is the answer. Who cares what the question is.", category: "Funny" },
  { text: "Your ideas are valid. Even if no one listens yet.", category: "Inspirational" },
  { text: "One does not simply write bug-free code.", category: "Snarky" },
  { text: "You're doing better than you think you are.", category: "Uplifting" },
  { text: "Even the stars take billions of years to shine.", category: "Poetic" },
  { text: "An empty file has infinite potential.", category: "Minimalist" },
];

export const getFortune = () => {
  const i = Math.floor(Math.random() * fortunes.length);
  return fortunes[i];
};
