import { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../utility/AuthService";

const ModalUpdateEmail = ({ setOpen, setOpenConfirm }) => {
  const user = useContext(AuthContext);
  const modalRef = useRef(null);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenConfirm(true);
  };

  return (
    <>
      <SModalWrap
        onClick={(e) => {
          //モーダルウィンドウの外側がクリックされたか判定、外側なら閉じる
          if (modalRef.current.contains(e.target)) return;
          setOpen(false);
        }}
      >
        <SModalInner ref={modalRef}>
          <h1>メールアドレス変更</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <button type="submit">OK</button>
          </form>
        </SModalInner>
      </SModalWrap>
    </>
  );
};

const SModalWrap = styled.section`
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SModalInner = styled.div`
  color: #000;
  background-color: #fffffe;
  width: calc(1500 / 1920 * 100vw);
  height: calc(1900 / 1920 * 100vw);
  border-radius: calc(65 / 1920 * 100vw);
`;

export default ModalUpdateEmail;
