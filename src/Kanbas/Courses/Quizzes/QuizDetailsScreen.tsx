import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchQuizDetails } from './client'; // make sure this function is imported properly

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const quiz = useSelector((state: any) => qid ? state.qui.find((q: any) => q._id === qid) : {});

    

  

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button  style={{ margin: '5px' }}>Preview</button>
                <button  style={{ margin: '5px' }}>Edit</button>
            </div>
            <hr />
            <h2 style={{ textAlign: 'left' }}>Quiz</h2>
            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* {[

                    ].map(([label, value]) => (
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '5px' }}>
                            <strong style={{ textAlign: 'right', width: '50%' }}>{label}:</strong>
                            <span style={{ marginLeft: '10px', textAlign: 'left', width: '50%' }}>{value}</span>
                        </div>
                    ))} */}
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
