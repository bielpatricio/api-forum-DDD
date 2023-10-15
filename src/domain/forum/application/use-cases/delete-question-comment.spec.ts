import { makeQuestionComment } from 'test/factories/make-question-comment'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { InMemoryQuestionsCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { NotAllowedError } from '@/core/erros/errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question comment by id', async () => {
    const newQuestionComment = makeQuestionComment()

    await inMemoryQuestionsRepository.create(newQuestionComment)

    await sut.execute({
      questionCommentId: newQuestionComment.id.toString(),
      authorId: newQuestionComment.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment from another user', async () => {
    const newQuestionComment = makeQuestionComment()

    await inMemoryQuestionsRepository.create(newQuestionComment)

    const result = await sut.execute({
      questionCommentId: newQuestionComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
