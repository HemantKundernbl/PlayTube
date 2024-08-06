// const asyncHandler = (fn)=>
//     async(req,res,next)=>{
//         try{
//             await fn(req,res,next)
//         }
//         catch(error){
//             res.send(error.code || 500).json({
//                 success:true,
//                 message:error.message
//             })
//         }

// }

const asyncHandler = (requestHandler) => async (req, res, next) => {
  return Promise.resolve(requestHandler(req, res, next)).catch((err) =>
    next(err)
  );
};

export { asyncHandler };
