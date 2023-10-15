import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { NotAllowedError } from '@/core/erros/errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer comment by id', async () => {
    const newAnswerComment = makeAnswerComment()

    await inMemoryAnswersRepository.create(newAnswerComment)

    await sut.execute({
      answerCommentId: newAnswerComment.id.toString(),
      authorId: newAnswerComment.authorId.toString(),
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer comment from another user', async () => {
    const newAnswerComment = makeAnswerComment()

    await inMemoryAnswersRepository.create(newAnswerComment)

    const result = await sut.execute({
      answerCommentId: newAnswerComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
