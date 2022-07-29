import React, { useEffect, useState } from "react";
import "./Profiles.css";
import { api } from "../../Services/api";

export default function Profiles() {
  const [profiles, setProfiles] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [message, setMessage] = useState();
  const [currentInvitedProfile, setCurrentInvitedProfile] = useState();
  const [invites, setInvites] = useState();
  const [contacts, setContacts] = useState();

  useEffect(() => {
    api
      .get("/perfil/")
      .then((resp) => setCurrentProfile(resp.data))
      .catch((error) => console.error(error));


    api
      .get("/perfis/")
      .then((resp) => setProfiles(resp.data))
      .catch((error) => console.error(error));

    api
      .get("/convites/")
      .then((resp) => {
        const invitesInfo = resp.data.map((el) => {
          const FindedInvite = profiles?.find((profile) => el.solicitante === profile.id);
          return { ...FindedInvite, inviteId: el.id };
        });
        setInvites(invitesInfo);
      })
      .catch((error) => console.error(error))
  }, [profiles]);

  function invite(id) {
    api
      .post(`/convites/convidar/${id}`)
      .then((resp) => setMessage(resp.data.mensagem))
      .catch((error) => console.error(error));

    setCurrentInvitedProfile(id);
  }
  function aceitarConvite(id) {
    api
      .post(`/convites/aceitar/${id}`)
      .then((resp) => console.log(resp))
      .catch((error) => console.error(error));
  }
  return (
    <>
      <h1>Seja bem vindo {currentProfile.nome}</h1>
      <div className="wrapper">
        <div className="profiles">
          <div className="invite">
            {
              profiles?.map(profile =>
                profile.id === currentProfile?.id ? null : (
                  <div key={profile.id}>
                    <div className="card">
                      <h3>{profile.nome}</h3>
                      <span>{profile.email}</span>
                      {profile.pode_convidar ? <button className="icon" title="convidar" onClick={() => invite(profile.id)}></button> : null}
                    </div>
                    {profile.id === currentInvitedProfile ? <span className="message">{message}</span> : null}
                  </div>
                ),
              )
            }
          </div>
          <div className="invitations">
            <h2>Convites</h2>
            {
              invites?.map(invite => (
                <div className="card-default card" key={invite.inviteId}>
                  <h3>{invite.nome}</h3>
                  <button onClick={() => aceitarConvite(invite.inviteId)}>Aceitar</button>
                </div>
              ))
            }
          </div>
          <div className="contacts">
            <h2>Contatos</h2>
            <ul className="contact">
              {
                currentProfile?.contatos.map(contact => (
                  <li className="card-default card" key={contact.id}>
                    <h3>
                      {contact.nome}
                    </h3>
                    <span>
                      {contact.email}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}