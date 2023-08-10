async function saveData() {
  const text1 = document.getElementById('text1').value;
  const text2 = document.getElementById('text2').value;
  const text3 = document.getElementById('text3').value;
  const text4 = document.getElementById('text4').value;
  const text5 = document.getElementById('text5').value;


  const data = {};

  if (text1.trim() !== '') {
    data.text1 = text1;
  }
  
  if (text2.trim() !== '') {
    data.text2 = text2;
  }
  
  if (text3.trim() !== '') {
    data.text3 = text3;
  }

  if (text4.trim() !== '') {
    data.text4 = text4;
  }

  if (text5.trim() !== '') {
    data.text5 = text5;
  }
  
  
  try {
    const response = await fetch('/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Данные отправлены');
    } else {
      alert('Ошибка при отправке данных');
    }
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    alert('Ошибка при отправке данных');
  }
}
