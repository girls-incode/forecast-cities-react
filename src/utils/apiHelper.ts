const ApiHelper = {
    fetchApi: (url: string) => {
        return fetch(url)
            .then(response => response.json())
            .catch((error) => { throw error })
    }
}

export default ApiHelper;