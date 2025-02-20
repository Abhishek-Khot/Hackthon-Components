import React from "react";

const Home = ({ geminiResponse }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6 text-gray-800">
      <h1 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        AI POWERED ASSISTANCE
      </h1>

      {geminiResponse ? (
        <div className="max-w-4xl mx-auto bg-gray-200 p-6 rounded-lg shadow-lg">
          <p className="text-lg">{geminiResponse}</p>
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-10">
          No response yet. Use the search bar above to ask a question.
        </p>
      )}
    </div>
  );
};

export default Home;
// import React from "react";
// import DOMPurify from "dompurify";

// const Home = ({ geminiResponse }) => {
//   const sanitizedResponse = geminiResponse ? DOMPurify.sanitize(geminiResponse) : "";

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6 text-gray-800">
//       <h1 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//         Gemini Response
//       </h1>

//       {sanitizedResponse ? (
//         <div
//           className="max-w-4xl mx-auto bg-gray-200 p-6 rounded-lg shadow-lg"
//           dangerouslySetInnerHTML={{ __html: sanitizedResponse }}
//         />
//       ) : (
//         <p className="text-center text-gray-400 mt-10">
//           No response yet. Use the search bar above to ask a question.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Home;