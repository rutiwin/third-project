import axios from 'axios';
import { appConfig } from "../appConfig";

const api = axios.create({
    baseURL: appConfig.url,
    headers: {
        'Content-Type': 'application/json',
        'doormanKey': 'GZs7Y!82b@kF%9Rlz3xJp#4Q^nWcVmA&dThUo',
    }
});

export async function getAllVacations(token: string, page: number, filters: any) {
    const res = await api.get(`/vacations?page=${page}&followed=${filters.followed}&upcoming=${filters.upcoming}&active=${filters.active}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return {
        vacations: res.data.vacations,
        totalPages: res.data.totalPages
    };
}

export async function addVacation(vacation: FormData, token: string): Promise<void> {
    const res = await api.post('/vacations', vacation, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
}

export async function updateVacation(vacationId: number, vacation: FormData, token: string): Promise<void> {
    await api.put(`/vacations/${vacationId}`, vacation, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
}

export async function deleteVacation(vacationId: number, token: string): Promise<void> {
    await api.delete(`/vacations/${vacationId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function uploadVacationImage(vacationId: number, image: File, token: string): Promise<void> {
    const formData = new FormData();
    formData.append('image', image);

    await deleteVacationImage(vacationId, token);

    await api.post(`/vacations/image/${vacationId}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const followVacation = async (userId: number, vacationId: number, token: string): Promise<void> => {
    try {
        await api.post(`/vacations/${vacationId}/follow`, { userId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        console.error("Error following vacation:", error);
        throw error; 
    }
};

export const unfollowVacation = async (userId: number, vacationId: number, token: string): Promise<void> => {
    try {
        await api.delete(`/vacations/${vacationId}/unfollow`, {
            headers: { Authorization: `Bearer ${token}` },
            data: { userId }
        });
    } catch (error) {
        console.error("Error unfollowing vacation:", error);
        throw error; 
    }
};

export async function getVacationImage(vacationId: number, token: string) {
    const res = await api.get(`/vacations/images/${vacationId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}

// New function to delete the old image
export async function deleteVacationImage(vacationId: number, token: string): Promise<void> {
    await api.delete(`/vacations/image/${vacationId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getVacationReportData = async (token: string): Promise<{ destination: string, followersCount: number }[]> => {
    try {
        const res = await api.get(`/vacation/report`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data as { destination: string; followersCount: number; }[];
        
    } catch (error) {
        console.error("Error get vacation report data:", error);
        throw error;
    }
};