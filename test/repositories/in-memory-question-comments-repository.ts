import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionsCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  // async delete(question: Question) {
  //   const itemIndex = this.items.findIndex((item) => item.id === question.id)

  //   this.items.splice(itemIndex, 1)
  // }
}
