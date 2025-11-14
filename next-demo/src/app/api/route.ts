export async function GET(request: Request) {


  console.log(request);

  const myBlob = new Blob();
  const init = { status: 200, statusText: "SuperSmashingGreat!" };
  return new Response(myBlob, init);
}