/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Avatar from '../../components/Avatar';
import IconButton from '../../components/IconButton';
import useAccount from '../../hook/useAccount';
import Input from '../../components/Input';
import { validation } from '../../helpers/CredentialsValidation';

ChartJS.register(ArcElement, Tooltip);

const User: NextPage = () => {
  const {
    user,
    getUserById,
    updateInfo,
    isOwner,
    isUsernameValid,
    setIsUsernameValid,
  } = useAccount();

  const [username, setUsername] = useState(user?.username as string);
  const [email, setEmail] = useState(user?.email as string);
  const [name, setName] = useState(user?.name as string);
  const [bio, setBio] = useState(user?.bio as string);
  const route = useRouter();
  const { id } = route.query;

  useEffect(() => {
    (async () => {
      if (id) {
        await getUserById(id as string);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (user) {
      setUsername(user.username as string);
      setEmail(user.email as string);
      setName(user.name as string);
      setBio(user.bio as string);
    }
  }, [user]);

  const [isModifyDisabled, setIsModifyDisabled] = useState(true);

  const modify = async () => {
    const vaildity = await updateInfo(
      email as string,
      username as string,
      name as string,
      bio as string,
    );
    if (vaildity) {
      setIsModifyDisabled(!isModifyDisabled);
    }
  };

  const reset = () => {
    setUsername(user?.username as string);
    setEmail(user?.email as string);
    setName(user?.name as string);
    setBio(user?.bio as string);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center pt-24">
      <section className="w-11/12 lg:w-8/12 flex flex-col lg:flex-row justify-center items-start lg:justify-between">
        <div className="flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center lg:items-stretch border-2 border-gray-300 rounded-lg w-full lg:w-8/12 mb-4">
          <div className="flex flex-col lg:flex-row lg:grow justify-center lg:justify-start items-center lg:items-stretch">
            <Avatar
              dimen="xxl"
              imageUrl={
                user?.photo_url
                  ? (user?.photo_url as string)
                  : 'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg'
              }
              className="lg:m-4"
            />
            <div className="w-11/12 lg:w-1/2 flex flex-col justify-center items-center lg:items-start mb-4 lg:mb-0">
              {isModifyDisabled ? (
                <>
                  <span className="text-3xl font-semibold text-center lg:text-left break-words">
                    {name}
                  </span>
                  <span className="text-2xl text-gray-700 text-center lg:text-left break-words">
                    {username}
                  </span>
                  <span className="text-gray-700 mb-4 text-sm text-center lg:text-left break-words">
                    {email}
                  </span>
                  <span className="text-gray-700 text-center lg:text-left break-words">
                    {bio}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold">Name:</span>
                  <Input
                    hint="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="mb-2"
                  />
                  <span className="text-sm font-semibold">Username:</span>
                  <Input
                    hint="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    isInvalid={isUsernameValid}
                    errorText="username non può essere vuoto"
                    className="mb-2"
                  />
                  <span className="text-sm font-semibold">Bio:</span>
                  <Input
                    hint="Bio"
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                    className="mb-2"
                  />
                </>
              )}
            </div>
          </div>
          <div className="w-full lg:w-fit">
            {isOwner &&
              (isModifyDisabled ? (
                <IconButton
                  icon={isModifyDisabled ? 'edit' : 'done'}
                  size="lg"
                  className="mt-4 ml-4 lg:m-4 self-start lg:self-auto"
                  onClick={() => {
                    if (isModifyDisabled) {
                      setIsModifyDisabled(!isModifyDisabled);
                    } else {
                      modify();
                    }
                  }}
                />
              ) : (
                <div className="flex lg:flex-col justify-start items-center">
                  <IconButton
                    icon={isModifyDisabled ? 'edit' : 'done'}
                    size="lg"
                    className="mt-4 ml-4 lg:m-4 self-start lg:self-auto"
                    onClick={() => {
                      if (isModifyDisabled) {
                        setIsModifyDisabled(!isModifyDisabled);
                      } else {
                        modify();
                      }
                    }}
                  />
                  <IconButton
                    icon={'close'}
                    size="lg"
                    className="mt-4 ml-4 lg:m-4 self-start lg:self-auto"
                    onClick={() => {
                      reset();
                      setIsModifyDisabled(true);
                      setIsUsernameValid(validation.VALID);
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="flex  justify-center lg:justify-start items-start lg:items-stretch border-2 border-gray-300 rounded-lg w-full lg:w-3/12 mb-4">
          <Doughnut
            data={{
              datasets: [
                {
                  label: 'Dark Pattern Rilevati',
                  data: [12, 4, 5],
                  backgroundColor: ['#f00', '#0f0', '#00f'],
                },
              ],
            }}
            className="m-4"
          />
        </div>
      </section>
      <section className="flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center lg:items-stretch border-2 border-gray-300 rounded-lg w- mb-4"></section>
    </div>
  );
};

export default User;