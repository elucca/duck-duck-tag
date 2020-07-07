const getId = () => {
    const id = (new Date().getTime())
    .toFixed(0)
    .toString();

    console.log(id)

    return id
}

export default getId
