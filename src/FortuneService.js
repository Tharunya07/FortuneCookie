const fortunes = [
  "You will discover joy in the smallest moments.",
  "An unexpected event will soon bring you clarity.",
  "You are stronger than your doubts.",
  "Every sunrise brings a new chance.",
  "Take the risk—your future self will thank you.",
  "Kindness always comes back around.",
  "Your ideas will spark something brilliant.",
  "Today’s patience is tomorrow’s strength.",
  "You are already becoming who you need to be.",
  "Creativity will flow when you stop overthinking.",
  "Someone is inspired by your courage.",
  "Silence holds more power than noise.",
  "What you seek is also seeking you.",
  "A small step today sets up a giant leap.",
  "Celebrate how far you've come.",
  "You light up more lives than you know.",
  "There’s peace waiting in your pause.",
  "Joy sneaks in when you're not looking.",
  "You are the calm in someone’s storm.",
  "Magic happens when you show up fully.",
  "Your energy is a gift. Guard it."
];

export function getFortune() {
  const index = Math.floor(Math.random() * fortunes.length);
  return { text: fortunes[index] };
}
