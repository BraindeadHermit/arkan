/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import { auth } from '../firebase.config';
import { validation } from '../helpers/CredentialsValidation';
import { DarkPattern, DonutChartData, UserInfo } from '../types';
import UserDAO from '../dao/UserDAO';
import ReportDAO from '../dao/ReportDAO';
import AnalysisDAO from '../dao/AnalysisDAO';

const useAccount = () => {
  const [user, setUser] = useState<UserInfo>();
  const [isOwner, setIsOwner] = useState(false);
  const [userExist, setUserExist] = useState(true);

  const { getUserDataById, modifyUserInfo, firebaseError } = UserDAO();
  const { getReportsByUserId } = ReportDAO();
  const { getAnalysisByUserId } = AnalysisDAO();

  const [isUsernameValid, setIsUsernameValid] = useState(validation.VALID);

  useEffect(() => {
    if (firebaseError) {
      alert(firebaseError);
    }
  }, [firebaseError]);

  const getUserById = async (id: string) => {
    try {
      setUser((await getUserDataById(id)) as UserInfo);
      if (id === auth.currentUser?.uid) {
        setIsOwner(true);
      }
    } catch (error) {
      setUserExist(false);
    }
  };

  const updateInfo = async (
    email: string,
    username: string,
    name: string,
    bio: string,
  ): Promise<boolean> => {
    setIsUsernameValid(validation.VALID);
    if (username === '') {
      setIsUsernameValid(validation.EMPTY);
      return false;
    }

    const pojo = {
      email,
      username,
      name,
      bio,
    } as UserInfo;

    if (user) {
      const isUpdated = await modifyUserInfo((user as UserInfo).data_id, pojo);
      if (isUpdated) {
        setUser({
          ...user,
          bio,
          username,
          name,
        });
      }
      setIsUsernameValid(validation.VALID);
      return true;
    }

    return false;
  };

  function cryptoRandom() {
    const typedArray = new Uint8Array(10);
    const randomValue = Math.sqrt(crypto.getRandomValues(typedArray)[0]);
    const randomFloat = randomValue / 2 ** 8;
    return randomFloat;
  }

  const generateRandomColor = () => {
    const maxVal = 0xffffff; // 16777215
    let randomNumber = cryptoRandom() * maxVal;
    randomNumber = Math.floor(randomNumber);
    const convert = randomNumber.toString(16);
    const randColor = convert.padStart(6, '0');
    return `#${randColor.toUpperCase()}`;
  };

  const createStructure = (
    darkPatternList: DarkPattern[],
  ): DonutChartData[] | undefined => {
    const statistycs: DonutChartData[] | undefined = [];
    darkPatternList?.forEach((darkPattern) => {
      const index = statistycs?.findIndex(
        (statistyc) => statistyc.name === darkPattern['detected-dp-name'],
      );
      if (index !== -1) {
        statistycs[index].darkPatternCount += 1;
      } else {
        statistycs.push({
          name: darkPattern['detected-dp-name'],
          darkPatternCount: 1,
          backgroundColor: generateRandomColor(),
        });
      }
    });
    return statistycs;
  };

  const getReportsStatistycs = async (): Promise<
    DonutChartData[] | undefined
  > => {
    const reports: DarkPattern[] | null = await getReportsByUserId(
      user?.uid as string,
    );

    if (reports?.length !== 0) {
      return createStructure(reports as DarkPattern[]);
    }

    return undefined;
  };

  const getAnalysisStatistics = async (): Promise<
    DonutChartData[] | undefined
  > => {
    const analysis: DarkPattern[] | null = await getAnalysisByUserId(
      user?.uid as string,
    );
    if (analysis?.length !== 0) {
      return createStructure(analysis as DarkPattern[]);
    }

    return undefined;
  };

  return {
    user,
    getUserById,
    updateInfo,
    isUsernameValid,
    setIsUsernameValid,
    getReportsStatistycs,
    getAnalysisStatistics,
    isOwner,
    userExist,
    firebaseError,
  };
};

export default useAccount;
