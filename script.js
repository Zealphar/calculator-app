const num1Input = document.getElementById("nickels");
const num2Input = document.getElementById("dimes");
const num3Input = document.getElementById("quarters");
const num4Input = document.getElementById("dollar-quarters");
const sumInput = document.getElementById("change");
const num5Input = document.getElementById("ones");
const num6Input = document.getElementById("fives");
const num7Input = document.getElementById("tens");
const num8Input = document.getElementById("twenties");
const totalInput = document.getElementById("total");
const onesToLeave = document.getElementById("ones-to-leave");
const fivesToLeave = document.getElementById("fives-to-leave");
const tensToLeave = document.getElementById("tens-to-leave");
const twentiesToLeave = document.getElementById("twenties-to-leave");
const actual = document.getElementById("actual");
const expected = document.getElementById("expected");
const variance = document.getElementById("variance");

function updateChange() {
  const nickels = parseFloat(num1Input.value) || 0;
  const dimes = parseFloat(num2Input.value) || 0;
  const quarters = parseFloat(num3Input.value) || 0;
  const DQ = parseFloat(num4Input.value) || 0;
  const sum = (0.05 * nickels) + (0.10 * dimes) + (0.25 * quarters) + (1.00 * DQ);
  sumInput.value = sum.toFixed(2);
  return sum;
}

function updateTotal() {
  const ones = parseFloat(num5Input.value) || 0;
  const fives = parseFloat(num6Input.value) || 0;
  const tens = parseFloat(num7Input.value) || 0;
  const twenties = parseFloat(num8Input.value) || 0;
  const sum = ones + (fives * 5) + (tens * 10) + (twenties * 20);
  totalInput.value = sum;
  return sum;
}

function updateFinalTotal() {
  const changeAmount = updateChange();
  const cashAmount = updateTotal();
  const finalTotal = changeAmount + cashAmount;
  totalInput.value = finalTotal.toFixed(2);
  const leaveOnes = updateBillsToLeave();
  onesToLeave.value = leaveOnes[0];
  fivesToLeave.value = leaveOnes[1];
  tensToLeave.value = leaveOnes[2];
  variance.value = (actual.value - expected.value).toFixed(2);
}

function updateBillsToLeave() {
  const change = updateChange();
  let containFives = false;
  let containTens = false;
  let leftoverFives = 0;
  let leftover = 200 -  Math.floor(change);
  let leftoverAlt = 200 - Math.ceil(change);
  let leftoverTens = 0;
  let leftOverTwenties = 0;
  let onesCopy = parseFloat(num5Input.value) || 0;
  let fivesCopy = parseFloat(num6Input.value) || 0;
  let tensCopy = parseFloat(num7Input.value) || 0;

  //get the ones
  if ((leftoverAlt - onesCopy) % 5 === 0) {
    leftoverFives = (leftover - onesCopy) / 5;
  } else {
    while ((leftover - onesCopy) % 5 !== 0) {
      onesCopy--;
    }
    leftoverFives = (leftover - onesCopy) / 5;
  }
  
// get the fives
leftoverFives = Math.floor((200 - Math.floor(change) - onesCopy) / 5);
while (leftoverFives > fivesCopy) {
  leftoverFives--;
}

// get the tens
leftoverTensCeil = (200 - Math.ceil(change) - (leftoverFives * 5) - onesCopy);
leftoverTensFloor = (200 - Math.floor(change) - (leftoverFives * 5) - onesCopy);
  if (leftoverTensCeil % 10 ===5) {
    leftoverFives--;
    leftoverTensCeil+=10;
    leftoverTens = leftoverTensCeil / 10;
  }
  if (leftoverTensFloor % 10 ===5) {
    leftoverFives--;
    leftoverTensFloor+=10;
    leftoverTens = leftoverTensFloor / 10;
  }
  leftoverTens = Math.max(leftoverTensCeil / 10,  leftoverTensFloor / 10);
return [onesCopy, leftoverFives, Math.floor(leftoverTens)];
}

num1Input.addEventListener("input", updateFinalTotal);
num2Input.addEventListener("input", updateFinalTotal);
num3Input.addEventListener("input", updateFinalTotal);
num4Input.addEventListener("input", updateFinalTotal);
num5Input.addEventListener("input", updateFinalTotal);
num6Input.addEventListener("input", updateFinalTotal);
num7Input.addEventListener("input", updateFinalTotal);
num8Input.addEventListener("input", updateFinalTotal);
actual.addEventListener("input", updateFinalTotal);
expected.addEventListener("input", updateFinalTotal);
