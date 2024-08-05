import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetQuizDetails,findQuizzesForCourse } from './client'; // make sure this function is imported properly
import { setQuizzes } from './reducer';

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {quizzes} = useSelector((state: any) => state.quizzesReducer);
    const quiz =  quizzes ? quizzes.find((q: any) => q._id === qid):[];

    const getQuizzes = async () => {

        if (qid) {
          const quizzesData = await findQuizzesForCourse(cid as string);
          dispatch(setQuizzes(quizzesData));
        }
      };
      const handleEditQuiz = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/edit/${qid}`);
      };

      const handlePreview = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/preview/${qid}`);
      };
      useEffect(() => {
        getQuizzes();
      }, []);

  

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button  style={{ margin: '5px' }} onClick={handlePreview}>Preview</button>
                <button  style={{ margin: '5px' }} onClick={handleEditQuiz}>Edit</button>
            </div>
            <hr />
            <h2 style={{ textAlign: 'left' }}>Quiz</h2>
            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {[
                        ["Quiz Type", quiz.quizType],
                        ["Points", quiz.points],
                        ["Assignment Group", quiz.assignmentGroup],
                        ["Shuffle Answers", quiz.shuffleAnswers ? 'Yes' : 'No'],
                        ["Time Limit", `${quiz.timeLimit} minutes`],
                        ["Multiple Attempts", quiz.multipleAttempts ? 'Yes' : 'No'],
                        ["How Many Attempts", quiz.HowManyAttempts],
                        ["Show Correct Answers", quiz.showCorrectAnswers],
                        ["Access Code", quiz.accessCode],
                        ["One Question at a Time", quiz.oneQuestionAtATime ? 'Yes' : 'No'],
                        ["Webcam Required", quiz.webcamRequired ? 'Yes' : 'No'],
                        ["Lock Questions After Answering", quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No']
                    ].map(([label, value]) => (
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '5px' }}>
                            <strong style={{ textAlign: 'right', width: '50%' }}>{label}:</strong>
                            <span style={{ marginLeft: '10px', textAlign: 'left', width: '50%' }}>{value}</span>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <table style={{ margin: 'auto', border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Due</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>For</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Available From</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Until</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{}</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Everyone</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{}</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
