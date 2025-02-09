# OpenAI Quiz Generator

A Next.js application that generates quizzes on any topic using OpenAI's API. Users can test their knowledge with automatically generated multiple-choice questions.

## Features

- Generate quizzes on any topic
- 10 multiple-choice questions per quiz
- Dark/Light mode support
- Score tracking
- Responsive design
- Instant feedback

## Prerequisites

Before you begin, ensure you have:

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

## Installation

1. Clone the repository:

```bash
git clone https://github.com/s1kopath/oprnaiquiz.git
cd oprnaiquiz
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:

```plaintext
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Enter any topic in the input field
2. Click "Generate Quiz" to create a new quiz
3. Answer the multiple-choice questions
4. Submit your answers to see your score
5. Try different topics to test your knowledge!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [OpenAI](https://openai.com/) for providing the GPT API
- [Next.js](https://nextjs.org/) for the awesome React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
