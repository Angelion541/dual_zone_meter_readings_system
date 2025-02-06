import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { getFromDataIDB } from '../api/idb';

export const CorrectionModal = ({ data }) => {
  const {
    flag = false,
    prevDay,
    prevNight,
    newDay,
    newNight,
    onConfirm,
    onCancel,
  } = data;

  const [correction, setCorrection] = useState({});

  useEffect(() => {
    async function fetch() {
      const { day, night } = await getFromDataIDB('correction', 'correction');
      setCorrection({ day, night })
    }
    fetch();
  }, [])

  return (
    <Modal
      title="Корекція показань"
      centered
      open={flag}
      onOk={() => onConfirm()}
      onCancel={() => onCancel()}
    >
      <p>Ви ввели нижчі показники за попередні, ви впевнені в показниках?</p>
      <p>День:</p>
      <p>
        {`Минулі: ${prevDay} `}
        {`Поточні: ${newDay} `}
        {`Кількість квт: ${newDay - prevDay} `}
        {newDay < prevDay && `Після корекції: ${correction?.day}`}
      </p>
      <p>Ніч:</p>
      <p>
        {`Минулі: ${prevNight} `}
        {`Поточні: ${newNight} `}
        {`Кількість квт: ${newNight - prevNight} `}
        {newNight < prevNight && `Після корекції: ${correction?.night}`}
      </p>
    </Modal>
  );
};