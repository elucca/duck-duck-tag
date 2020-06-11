import React from 'react'
import imageTypes from './ImageTypes.ts'


const Results = ({ result }) => {


    if (!result) {
        return ''
    }

    if (result.length === 0) {
        return ''
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Tag</th>
                    <th>Accuracy</th>
                    <th>Service</th>
                </tr>
            </thead>
            <tbody>
                    {
                        result.map((tag: imageTypes.tag) => {
                            return (
                                <tr key={tag.label + tag.service}>
                                    <td>{tag.label}</td>
                                    <td> {Math.floor(tag.accuracy * 10000) / 100} %</td>
                                    <td> { tag.service }</td>
                                </tr>
                            )
                        })
                    }
            </tbody>
        </table>
    )

}

export default Results