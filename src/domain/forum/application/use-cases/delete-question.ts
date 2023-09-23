import { QuestionRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.questionRepository.delete(question)

    return {}
  }
}
