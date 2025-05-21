import api from "./api";

const createLesson = async (data) => {
    const response = await api.post('/lesson', data)
    return response.data;
}

const listLessons = async (filters) => {
    const response = await api.get('/lesson', {params: {
        id: filters.id,
        lesson_name: filters.lesson_name,
        lesson_subject: filters.lesson_subject
    }})

    return response.data;
}

