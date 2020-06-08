import React from 'react'
import imageTypes from './ImageTypes.ts'


const Results = ({ taglist }) => {


    if (!taglist) {
        return ''
    }

    if (taglist.length === 0) {
        return ''
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Tag</th>
                    <th>Accurary</th>
                    <th>Service</th>
                </tr>
            </thead>
            <tbody>
                    {
                        taglist.map((tag: imageTypes.tag) => {
                            return (
                                <tr key={tag.service+tag.label}>
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