function triviaQuestion(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
}

const allQuestions = [
    new triviaQuestion("", [], ),
]