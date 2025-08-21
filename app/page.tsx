export default function Home() {
  return (
    <div className="">

        <label htmlFor="file" className="box">Choose a file</label>
        <input id="file" name="file"type="file" className="box hidden" placeholder="Choose your file"/>
    </div>
  );
}
