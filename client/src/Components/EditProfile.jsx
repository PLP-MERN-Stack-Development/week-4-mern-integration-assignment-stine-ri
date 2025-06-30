import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { getUser, updateUser, uploadProfileImage } from '../api/api';
import { User, Mail, Camera, Loader, Check } from 'react-feather';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Validation schema
const profileSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  bio: yup.string().max(200, 'Bio must be less than 200 characters'),
});

const EditProfile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
const userId = storedUser?._id || storedUser?.id;

if (!userId) {
  setError('User not found');
  setIsLoading(false);
  return;
}

const { data } = await getUser(userId);

        setValue('username', data.username);
        setValue('email', data.email);
        setValue('bio', data.bio || '');
        setPreviewImage(data.profileImage || '');
        setIsLoading(false);
      } catch {
        setError('Failed to load profile');
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // Upload image first if selected
      if (profileImage) {
        const imageFormData = new FormData();
        imageFormData.append('image', profileImage);
        const { data: imageData } = await uploadProfileImage(imageFormData);
        formData.profileImage = imageData.url;
      }

      // Update user profile
      const storedUser = JSON.parse(localStorage.getItem('user'));
const userId = storedUser?._id || storedUser?.id;

await updateUser(userId, formData);


      setSuccess(true);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md mx-auto">
        <Motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-4 px-6">
            <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          </div>

          <div className="p-6">
            {success ? (
              <Motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Profile Updated!</h3>
                <p className="text-gray-500">Redirecting to your profile...</p>
              </Motion.div>
            ) : (
              <>
                {error && (
                  <Motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </Motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <User className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <label
                        htmlFor="profileImage"
                        className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer shadow-lg transition-colors"
                      >
                        <Camera className="h-5 w-5" />
                        <input
                          id="profileImage"
                          name="profileImage"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        {...register('username')}
                        className={`w-full pl-10 pr-3 py-2 border ${errors.username ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                      />
                    </div>
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        {...register('email')}
                        className={`w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      {...register('bio')}
                      className={`w-full px-3 py-2 border ${errors.bio ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                    />
                    {errors.bio && (
                      <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('/profile')}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </Motion.button>
                    <Motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-70 flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="animate-spin mr-2 h-4 w-4" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Motion.button>
                  </div>
                </form>
              </>
            )}
          </div>
        </Motion.div>
      </div>
    </Motion.div>
  );
};

export default EditProfile;