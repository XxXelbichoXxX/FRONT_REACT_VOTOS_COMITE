import { useState } from "react";
import { getCountVotes, getCountVotesTop, getCheckVotes, addVotesApi } from "../api/votes";
import { useAuth } from "./useAuth";

export function useVotes() {
  const { auth } = useAuth();
  const [loadingVote, setLoadingVote] = useState(true);
  const [errorVote, setErrorVote] = useState(null);
  const [votes, setVotes] = useState(null);

  const getVotesManual = async (data) => {
    try {
      setLoadingVote(true);
      const response = await getCountVotes(
        data.stageIdFK,
        data.rangeIdFK,
        data.period,
        auth.token
      );
      setLoadingVote(false);

      console.log(response);
      setVotes(response);
      return response;
    } catch (errorVote) {
      setLoadingVote(false);
      setErrorVote(errorVote);
    }
  };

  const getVotesUser = async (stageID, voteYear) => {
    try {
      setLoadingVote(true);
      const response = await getCountVotes(
        stageID,
        auth.me.rangeIdfk,
        voteYear, // Aquí necesitas definir 'voteYear'
        auth.token
      );
      setLoadingVote(false);

      setVotes(response);
      console.log(votes);
    } catch (errorVote) {
      setLoadingVote(false);
      setErrorVote(errorVote);
    }
  };

  const getVotesManualTop = async (stageId, voteYear, top) => {
    try {
      setLoadingVote(true);
      const response = await getCountVotesTop(
        stageId,
        auth.me.rangeIdFK,
        voteYear,
        top,
        auth.token
      );
      setLoadingVote(false);

      setVotes(response);
      //console.log(response);
    } catch (errorVote) {
      setLoadingVote(false);
      setErrorVote(errorVote);
    }
  };

  const userVoted = async (stageId, voteYear) => {
    try {
      setLoadingVote(true);
      const response = await getCheckVotes(
        auth.me.username,
        stageId,
        voteYear,
        auth.token
      );
      setLoadingVote(false);
      return response; // Devuelve directamente la respuesta
    } catch (errorVote) {
      setLoadingVote(false);
      setErrorVote(errorVote);
      return false; // En caso de errorVote, devuelve false
    }
  };
  const addVote = async (data) => {
    try {
      setLoadingVote(true);
      await addVotesApi(data, auth.token);
      setLoadingVote(false);
    } catch (errorVote) {
      setLoadingVote(false);
      setErrorVote(errorVote);
    }
  };

  return {
    loadingVote,
    errorVote,
    votes,
    getVotesUser,
    getVotesManual,
    getVotesManualTop,
    userVoted,
    addVote
  };
}
