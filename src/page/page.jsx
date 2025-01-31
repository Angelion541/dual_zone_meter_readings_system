import React, { useState } from 'react';
import { Button, Card, Input, Layout } from 'antd';
import { updateMeter } from '../controller/updateMeter';
import { CorrectionModal } from '../elements/correctionModal';

export const Page = () => {
  const [meterId, setMeterId] = useState('');
  const [newDay, setNewDay] = useState('');
  const [newNight, setNewNight] = useState('');
  const [paymentBill, setPaymentBill] = useState(null);
  const [warningData, setWarningData] = useState({ flag: false });

  const updateMeterHandler = (meterId, newDay, newNight) => {
    const paymentBill = updateMeter(meterId, newDay, newNight, setWarningData);
    setPaymentBill(paymentBill);
  }

  return (
    <Layout style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Показники лічильника" style={{ width: 500 }}>
        <Input
          type='text'
          size="large"
          addonBefore="Номер лічильника"
          placeholder="Введіть номер лічильника"
          style={{ marginBottom: 20 }}
          onChange={(e) => setMeterId(e.target.value)}
        />

        <Input
          type='number'
          size="large"
          addonBefore="Показники день"
          placeholder="Введіть показники"
          style={{ marginBottom: 20 }}
          onChange={(e) => setNewDay(e.target.value)}
        />
        <Input
          type='number'
          size="large"
          addonBefore="Показники ніч"
          placeholder="Введіть показники"
          style={{ marginBottom: 20 }}
          onChange={(e) => setNewNight(e.target.value)}
        />
        <Button
          type="primary"
          size="large"
          block
          onClick={() => updateMeterHandler(meterId, newDay, newNight)}
        >
          {'Розрахувати'}
        </Button>
      </Card>
      {paymentBill !== null && <h3>{<><p>Лічильник: {paymentBill.meterId}</p><p>Рахунок: {paymentBill.bill} грн</p></>}</h3>}
      {warningData.flag && <CorrectionModal data={warningData} />}
    </Layout>
  )
}

export default Page