import {createContext,useContext,useState,useEffect} from "react";
import { initializeApp } from "firebase/app";
import {useNavigate} from "react-router-dom";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import { GoogleAuthProvider,signInWithPopup,onAuthStateChanged } from "firebase/auth";
import {getFirestore,collection,addDoc,getDocs,getDoc,doc,query,where} from "firebase/firestore";
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage";

const FirebaseContext=createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyA1r6c7AYiKjznxVabsmJm57-vni7bN4q8",
    authDomain: "bookify-e6c3b.firebaseapp.com",
    projectId: "bookify-e6c3b",
    storageBucket: "bookify-e6c3b.appspot.com",
    messagingSenderId: "456761994189",
    appId: "1:456761994189:web:54e03189b41b866dd0f284"
  };

  const FirebaseApp = initializeApp(firebaseConfig);

  const FirebaseAuth = getAuth(FirebaseApp);

  const googleProvider = new GoogleAuthProvider();

  const firestore=getFirestore(FirebaseApp);

  const storage=getStorage(FirebaseApp);


export const useFirebase=()=>useContext(FirebaseContext);


export const FirebaseProvider=(props)=>{
  
    const[user,setUser]=useState(null);

    useEffect(()=>{
        onAuthStateChanged(FirebaseAuth,user=>{
            // console.log("user",user);
            if(user) setUser(user);
        else setUser(null);
           });
    },[])

    const signupWithEmailAndPass=(email,password)=>{
        createUserWithEmailAndPassword(FirebaseAuth, email, password)
      }

      const signinWithEmailAndPass=(email,password)=>{
        signInWithEmailAndPassword(FirebaseAuth, email, password)
      }

      const signinWithGoogle=(email,password)=>{
        signInWithPopup(FirebaseAuth, googleProvider)
      }

      const logOut=()=>{

        FirebaseAuth.signOut()
           
         }

  
      const getImageURL=(path)=>{
        return getDownloadURL(ref(storage,path));
      }

      const handleCreateNewListing=async(name,isbn,price,cover)=>{
        const imageRef=ref(storage,`uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult=await uploadBytes(imageRef,cover);
        return await addDoc(collection(firestore,"books"),{
            name,
            isbn,
            price,
            imageURL:uploadResult.ref.fullPath,
            userID:user.uid,
            userEmail:user.email,
            displayName:user.displayName,
            photoURL:user.photoURL,
        })
      }

      const listAllBooks=()=>{
        return getDocs(collection(firestore,"books"));
      };

      const getBookById=async(id)=>{
        const docRef=doc(firestore,'books',id);
        const result=await getDoc(docRef);
        return result;
      }

      const placeOrder=async(bookId,qty)=>{
        const collectionRef=collection(firestore,'books',bookId,'orders');
        const result=await addDoc(collectionRef,{
          userID: user.uid,
          userEmail: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          qty:Number(qty),
        });
        return result;
      };

      const fetchMyBooks=async(userId)=>{
        const collectionRef=collection(firestore,"books");
        const q=query(collectionRef, where("userID","==",userId));

        const result=await getDocs(q);
        return result;
      }

      const getOrders=async(bookId)=>{
        const collectionRef=collection(firestore,'books',bookId,'orders');
      const result=await getDocs(collectionRef);
      return result;
      }

     const isLoggedIn= user ? true : false;

    return <FirebaseContext.Provider value={{
        signupWithEmailAndPass,
        signinWithEmailAndPass,
        signinWithGoogle,
        logOut,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        getOrders,
        isLoggedIn,
        user,
    }}>{props.children}</FirebaseContext.Provider>
}