import { Question } from "../../enterprise/entities/question";

export interface QuestionRepository {
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
}
