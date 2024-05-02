import { useState } from "react";
import { getCountVotes, getCountVotesTop, getCheckVotes, addVotesApi } from "../api/votes";
import { useAuth } from "./useAuth";

export function useVotes() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(null);

  const getVotesManual = async (data) => {
    try {
      setLoading(true);
      const response = await getCountVotes(
        data.stageIdFK,
        data.rangeIdFK,
        data.voteDate,
        auth.token
      );
      setLoading(false);

      console.log(response);
      setVotes(response);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getVotesUser = async (stageID, voteYear) => {
    try {
      setLoading(true);
      const response = await getCountVotes(
        stageID,
        auth.me.rangeIdfk,
        voteYear, // Aquí necesitas definir 'voteYear'
        auth.token
      );
      setLoading(false);

      setVotes(response);
      console.log(votes);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getVotesManualTop = async (stageId, voteYear, top) => {
    try {
      setLoading(true);
      const response = await getCountVotesTop(
        stageId,
        auth.me.rangeIdFK,
        voteYear,
        top,
        auth.token
      );
      setLoading(false);

      setVotes(response);
      //console.log(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const userVoted = async (stageId, voteYear) => {
    try {
      setLoading(true);
      const response = await getCheckVotes(
        auth.me.username,
        stageId,
        voteYear,
        auth.token
      );
      setLoading(false);
      return response; // Devuelve directamente la respuesta
    } catch (error) {
      setLoading(false);
      setError(error);
      return false; // En caso de error, devuelve false
    }
  };
  const addVote = async (data) => {
    try {
      setLoading(true);
      await addVotesApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    votes,
    getVotesUser,
    getVotesManual,
    getVotesManualTop,
    userVoted,
    addVote
  };
}
