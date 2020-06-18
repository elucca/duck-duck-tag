import React from 'react'
import ReactWordcloud from 'react-wordcloud'
import styles from './WordCloud.css'

const WordCloud = ({ job, animation }) => {

    if (!job) {
        return null
    }

    const services = job.services
    const result = job.result

    if (!result || result.length === 0 || animation) {
        return ''
    }

   
    const options = {
        fontSizes: [20, 45], //min, max (default min 5 is barely visible)
        rotations: 0 //all words horizontally
         //TODO: maybe exclude blue colors for now (background is blue)
    }


    const tags = (service) => {
        return result.filter(row => row.service === service).map(row =>
            ({
                text: row.label,
                // TODO: value could be the word count (somehow combined with accuracies ?)
                value: row.accuracy
            })
        )
    }

    // TODO/warning: why does my computer crash if i don't include the size style below
    return (
        <div className={styles.rows} style={{ height: 300, width: 1000 }}>
            {
                services.map(service => {
                    return(
                        <div key={service} className={styles.row}>
                            <ReactWordcloud options={options}
                            words={tags(service)} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default WordCloud
