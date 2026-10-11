import { useEffect, useRef, useState } from 'react';
import { InstagramReminders } from './InstagramReminders.js';
import Icon from '../ui/Icon.jsx';
import './FloatingSocial.css';

function Tractor() {
  return <svg className="tractor" viewBox="0 0 180 110" fill="none" aria-hidden="true">
    <path d="M31 70h99l14 14H26V70Z" fill="#34343a" />
    <rect x="43" y="44" width="60" height="30" rx="5" fill="#e20a14" />
    <path d="M71 17h29l9 32H71V17Z" fill="#ed3540" />
    <path d="M77 23h17l7 19H77V23Z" fill="#dcebf0" />
    <path d="M101 51h31l13 16h-44V51Z" fill="#e20a14" />
    <path d="M125 52V34h5v18" stroke="#51515a" strokeWidth="5" />
    <path d="m138 66 12 8 16-6v24h-17l-11-16" fill="#ddd9d2" />
    <circle cx="64" cy="81" r="23" fill="#242429" />
    <circle cx="64" cy="81" r="12" fill="#a5a5ad" />
    <circle cx="122" cy="84" r="16" fill="#242429" />
    <circle cx="122" cy="84" r="8" fill="#a5a5ad" />
    <path d="M22 97h133" stroke="#d7d5d0" strokeWidth="3" strokeLinecap="round" />
  </svg>;
}

export default function FloatingSocial({ available }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const enabled = available && !editing;
  const [invitation, setInvitation] = useState(false);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const invitationDismissed = useRef(false);
  const reminders = useRef(null);
  const [navigated, setNavigated] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const focusIn = event => setEditing(['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName));
    const focusOut = event => setEditing(['INPUT', 'TEXTAREA', 'SELECT'].includes(event.relatedTarget?.tagName));
    document.addEventListener('focusin', focusIn);
    document.addEventListener('focusout', focusOut);
    return () => {
      document.removeEventListener('focusin', focusIn);
      document.removeEventListener('focusout', focusOut);
    };
  }, []);

  useEffect(() => {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem('rn-instagram-teaser-v3') === 'dismissed'; } catch { /* Session-only fallback. */ }
    invitationDismissed.current = dismissed;
    const reveal = () => { if (window.scrollY > 450) { setNavigated(true); if (!invitationDismissed.current) setInvitation(true); } };
    window.addEventListener('scroll', reveal, { passive: true });
    reveal();
    return () => window.removeEventListener('scroll', reveal);
  }, []);

  useEffect(() => {
    let count = 0;
    try {
      const saved = Number(sessionStorage.getItem('rn-instagram-reminders-v3'));
      if (Number.isInteger(saved) && saved >= 0 && saved <= 3) count = saved;
    } catch { /* Reminders still work for this visit. */ }
    reminders.current = new InstagramReminders({ count, onShow: nextCount => {
      try { sessionStorage.setItem('rn-instagram-reminders-v3', String(nextCount)); } catch { /* No storage required. */ }
      setOpen(true);
    } });
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => { reminders.current?.destroy(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  useEffect(() => {
    reminders.current?.update({ eligible: enabled && navigated && pageVisible, open });
  }, [enabled, navigated, pageVisible, open]);

  useEffect(() => {
    if (open) dialog.current?.showModal();
    else if (dialog.current?.open) { dialog.current.close(); trigger.current?.focus(); }
  }, [open]);

  const close = () => {
    setOpen(false);
    setInvitation(false);
    invitationDismissed.current = true;
    try { sessionStorage.setItem('rn-instagram-teaser-v3', 'dismissed'); } catch { /* No storage required. */ }
  };

  const visitInstagram = () => {
    reminders.current?.stop();
    try { sessionStorage.setItem('rn-instagram-reminders-v3', '3'); } catch { /* No storage required. */ }
    close();
  };

  return <>
    <div className={`floating-social ${enabled ? '' : 'social-hidden'}`} aria-hidden={!enabled}>
      {invitation && enabled && <div className="instagram-invitation">
        <button type="button" className="invite-open" onClick={() => setOpen(true)}><Icon name="instagram" /><span>Veja a RN em ação</span></button>
        <button type="button" className="invite-dismiss" aria-label="Dispensar convite do Instagram" onClick={close}><Icon name="close" /></button>
      </div>}
      <button ref={trigger} type="button" className="floating-instagram" aria-label="Conhecer o Instagram da RN" tabIndex={enabled ? 0 : -1} onClick={() => setOpen(true)}><Icon name="instagram" /></button>
      <a className="floating-whatsapp" href="https://wa.me/554899668246" target="_blank" rel="noopener noreferrer" aria-label="Falar com a RN pelo WhatsApp" tabIndex={enabled ? 0 : -1}><Icon name="whatsapp" /></a>
    </div>
    <dialog ref={dialog} className="instagram-modal" onCancel={close} onClick={event => { if (event.target === dialog.current) close(); }} aria-labelledby="instagram-title" aria-describedby="instagram-description">
      <button autoFocus type="button" className="instagram-close" aria-label="Fechar convite do Instagram" onClick={close}><Icon name="close" /></button>
      {open && <div className="tractor-stage"><Tractor /><span>Obras que ganham forma.</span></div>}
      <div className="instagram-modal-content"><p className="eyebrow">RN EM AÇÃO</p><h2 id="instagram-title">Veja o trabalho<br />de perto.</h2><p id="instagram-description">No Instagram da RN, você pode acompanhar os registros das obras e conhecer melhor nosso trabalho com terraplanagem e pavimentação.</p><a className="action instagram-visit" href="https://www.instagram.com/rn_concretagem/" target="_blank" rel="noopener noreferrer" onClick={visitInstagram}>Visitar o Instagram <Icon name="instagram" /></a><button className="instagram-later" type="button" onClick={close}>Agora não</button></div>
    </dialog>
  </>;
}

