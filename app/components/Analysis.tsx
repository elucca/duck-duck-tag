import React from 'react'

const Analysis = ({ job, animation }) => {

    const result = job.result

    
    if (!result || result.length === 0 || animation) {
        return null
    }
    

    const services = job.services


    // parameters are names (service1, service2)
    const similarity = (s1, s2) => {
        if (s1 === s2) {
            return '🐌'
        }

        // Collect tags per service
        const s1tags = new Set( result.filter(row => row.service === s1).map(row => row.label) ) 
        const s2tags = new Set( result.filter(row => row.service === s2).map(row => row.label) ) 

        // Collect the amount of tags present in both taglists (*2 corresponds to collecting tags the other way around)
        const sameTags = new Set([...s1tags].filter(x => s2tags.has(x))).size

        // Similar as the clients code
        const accuracy = 100 * sameTags / Math.min( s1tags.size , s2tags.size )

        // Use two decimals precision
        return accuracy.toFixed(2)
    }

    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {
                                services.map(service => {
                                    return (
                                        <th key={service}>{service}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Nested map -> compare each to each
                            services.map(name1 => {
                                return (
                                    <tr key={name1}>
                                        <td>{name1}</td>
                                        {
                                            services.map(name2 => {
                                                return (
                                                    <td key={name1 + name2}>{similarity(name1, name2)}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Analysis