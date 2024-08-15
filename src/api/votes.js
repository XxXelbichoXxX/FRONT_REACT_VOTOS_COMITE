import axios from 'axios';
import { BASE_API } from '../utils/constants';


export async function getCountVotes(stageId, rangeId, period, token) {
    try {
        const url = `${BASE_API}/api/vote/countVotes/`;
        const params = {
            params: {
                stageIdFK: stageId,
                rangeIdFK: rangeId,
                period: period,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.get(url, params);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function countVotesByPeriodApi(period, token) {
    try {
        const url = `${BASE_API}/api/vote/countVotesByPeriod/`;
        const params = {
            params: {
                period: period,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.get(url, params);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function countVotesByFiltersApi(stageId, rangeId, period, token) {
    try {
        const url = `${BASE_API}/api/vote/countVotesByFilters/`;
        const params = {
            params: {
                stageIdFK: stageId,
                rangeIdFK: rangeId,
                period: period,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.get(url, params);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function addVotesApi(data, token) {
    try {
        const url = `${BASE_API}/api/vote/createMassiveVotes/`;

        const params = {
            headers: { 
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
        }

        const response = await axios.post(url, data, params);

        return response.data;
        
    } catch (error) { 
        throw error; 
    }
}

//para obtener los votos con el tope
export async function getCountVotesTop(stageId, rangeId, voteYear, tope, token) {
    try {
        const url = `${BASE_API}/api/vote/countTopVotes/`;
        const params = {
            params: {
                stageIdFK: stageId,
                rangeIdFK: rangeId,
                voteDate: voteYear,
                top: tope,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.get(url, params);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function updateRevocationStatus(empCandidateIdFK) {
    try {
        const url = `${BASE_API}/api/vote/updateRevocationStatus/`;
        const params = {
            params: {
                empCandidateIdFK: empCandidateIdFK,
            }
        };
        const response = await axios.get(url, params);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//para verificar si hay votos de un votante
export async function getCheckVotes(empVoterId, stageId, voteYear, token) {
    try {
        const url = `${BASE_API}/api/vote/checkExistingVote/`;
        const params = {
            params: {
                empVoterIdFK: empVoterId,
                stageIdFK: stageId,
                voteDate: voteYear,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.get(url, params);
        return response.data;
    } catch (error) {
        throw error;
    }
}