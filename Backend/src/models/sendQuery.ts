export interface sendQuery {
    q_id: string;
    instructions: string;
    section: string;
    question: string;
    answers: string[];
    imageUrl: string;
    videoUrl: string;
    mc: boolean;
    title: string;
}
