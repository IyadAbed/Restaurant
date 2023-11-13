function Landing() {
  const fakeData = {
    phoneNumber: "+1 123-456-7890",
    streetName: "123 Main Street",
    openingHours: "8:00 AM - 10:00 PM",
    landmarks: ["Schools", "Universities", "Markets"],
  };
  return (
    <>
      <div
        className="h-[100vh] w-full bg-[url('http://localhost:5500/public\\images\\image_1699818045370.jpeg')]"
        style={{ backgroundSize: "100% 100%" }}
      >
        <div className="container mx-auto flex items-center justify-end pr-12 h-full">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-4">
              Welcome to Our Restaurant
            </h1>
            <p className="text-lg mb-8">Discover the finest flavors in town!</p>
            <div className="mb-4">
              <p className="font-bold">Phone Number:</p>
              <p>{fakeData.phoneNumber}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Street Name:</p>
              <p>{fakeData.streetName}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Opening Hours:</p>
              <p>{fakeData.openingHours}</p>
            </div>
            <div>
              <p className="font-bold">Nearby Landmarks:</p>
              <ul>
                {fakeData.landmarks.map((landmark, index) => (
                  <li key={index}>{landmark}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
