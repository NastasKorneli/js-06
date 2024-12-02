const output = () => {
  let outputText = '\t';
  try{
    outputText += a + ',';
  } catch(err) {}
  try{
    outputText += b + ',';
  } catch(err) {}
    try{
    outputText += c + ',';
  } catch(err) {}
    try{
    outputText += d + ',';
  } catch(err) {}
    try{
    outputText += e + ',';
  } catch(err) {}
    try{
    outputText += i + ',';
  } catch(err) {}
  return outputText.replace(/,+$/,'');;
}