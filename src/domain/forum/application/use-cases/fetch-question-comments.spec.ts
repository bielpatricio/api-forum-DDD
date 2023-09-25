import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionsCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'

let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentsRepository =
      new InMemoryQuestionsCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionsCommentsRepository)
  })

  it('should be able to fetch comments by question id', async () => {
    await inMemoryQuestionsCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryQuestionsCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryQuestionsCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    const result = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch recent questions with pagination', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionsCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }

    const result = await sut.execute({
      page: 2,
      questionId: 'question-1',
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
