import React from 'react'

const Analysis = ({ job }) => {

    const result = job.result

    if (!result || result.length === 0) {
        return ''
    }

    const services = job.services

    // parameters are names (service1, service2)
    const similarity = (s1, s2) => {

        // Collect tags per service
        const s1tags = result.filter(row => row.service === s1).map(row => row.label)
        const s2tags = result.filter(row => row.service === s2).map(row => row.label)

        // Collect the amount of tags present in both taglists (*2 corresponds to collecting tags the other way around)
        const sameTags = s1tags.filter(tag => s2tags.includes(tag)).length * 2

        // Similarity = 100 * all similar tags / all tags
        const samePercent = 100 * sameTags / (s1tags.length + s2tags.length)

        // Use two decimals precision
        return samePercent.toFixed(2)
    }

    return (
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
                                                <td>{similarity(name1, name2)}</td>
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
    )
}

export default Analysis