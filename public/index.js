async function updateParagraphs() {
  try {
    const response = await fetch('/getData');
    const data = await response.json();
    document.getElementById('paragraph1').innerText = data.text1;
    document.getElementById('paragraph2').innerText = data.text2;
    document.getElementById('paragraph3').innerText = data.text3;
    document.getElementById('paragraph4').innerText = data.text4;
    document.getElementById('paragraph5').innerText = data.text5;


  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

document.addEventListener('DOMContentLoaded', updateParagraphs);
