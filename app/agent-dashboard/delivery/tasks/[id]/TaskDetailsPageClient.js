'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../context/AuthContext';
import { supabase } from '../../../../../lib/supabase';
import {
  ArrowLeft,
  Package,
  MapPin,
  Phone,
  Building2,
  Upload,
  CheckCircle,
  X,
  Camera,
  FileText,
  Loader
} from 'lucide-react';

export default function TaskDetailsPageClient({ params }) {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [task, setTask] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [proofImages, setProofImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [deliveryNotes, setDeliveryNotes] = useState('');

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setTaskId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (taskId && user) {
      fetchTaskDetails();
    }
  }, [taskId, user]);

  const fetchTaskDetails = async () => {
    try {
      const { data: agentData } = await supabase
        .from('agents')
        .select('id')
        .eq('user_id', user.id)
        .eq('agent_type', 'delivery')
        .single();

      const { data, error } = await supabase
        .from('agent_tasks')
        .select(`
          *,
          order:order_id(*),
          vendor:vendor_id(business_name, business_phone, business_address)
        `)
        .eq('id', taskId)
        .eq('agent_id', agentData.id)
        .single();

      if (error) throw error;
      setTask(data);
      
      // Load existing proof if any
      if (data.photos) {
        setProofImages(data.photos);
      }
      if (data.notes) {
        setDeliveryNotes(data.notes);
      }
    } catch (error) {
      console.error('Error fetching task:', error);
      alert('Error loading task details');
      router.push('/agent-dashboard/delivery/tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${task.order.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        // Upload to order-attachments bucket
        const { data, error } = await supabase.storage
          .from('order-attachments')
          .upload(fileName, file);

        if (error) throw error;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('order-attachments')
          .getPublicUrl(fileName);

        uploadedUrls.push(urlData.publicUrl);
      }

      setProofImages(prev => [...prev, ...uploadedUrls]);
      alert('Photos uploaded successfully!');
    } catch (error) {
      console.error('Error uploading photos:', error);
      alert('Error uploading photos. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setProofImages(prev => prev.filter((_, i) => i !== index));
  };

  const completeTask = async () => {
    if (proofImages.length === 0) {
      alert('Please upload at least one delivery proof photo');
      return;
    }

    if (!confirm('Mark this delivery as completed?')) return;

    setCompleting(true);

    try {
      // Update task
      const { error: taskError } = await supabase
        .from('agent_tasks')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          photos: proofImages,
          notes: deliveryNotes
        })
        .eq('id', taskId);

      if (taskError) throw taskError;

      // Update order status
      if (task.order_id) {
        const { error: orderError } = await supabase
          .from('orders')
          .update({
            status: 'delivered',
            updated_at: new Date().toISOString()
          })
          .eq('id', task.order_id);

        if (orderError) throw orderError;
      }

      // Update agent stats
      const { data: agentData } = await supabase
        .from('agents')
        .select('tasks_completed')
        .eq('user_id', user.id)
        .single();

      await supabase
        .from('agents')
        .update({
          tasks_completed: (agentData.tasks_completed || 0) + 1
        })
        .eq('user_id', user.id);

      alert('Delivery completed successfully!');
      router.push('/agent-dashboard/delivery/tasks');
    } catch (error) {
      console.error('Error completing task:', error);
      alert('Error completing delivery. Please try again.');
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading task details...</p>
      </div>
    );
  }

  if (!task) return null;

  const isCompleted = task.status === 'completed';
  const canComplete = task.status === 'in_progress';

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
              marginBottom: '8px',
              fontSize: '14px'
            }}
          >
            <ArrowLeft size={16} />
            Back to Tasks
          </button>
          <h1>Delivery Task</h1>
          <p>Task ID: {task.id.slice(0, 8)}</p>
        </div>
      </div>

      {/* Status Banner */}
      <div style={{
        background: isCompleted ? '#d1fae5' : canComplete ? '#dbeafe' : '#fef3c7',
        color: isCompleted ? '#065f46' : canComplete ? '#1e40af' : '#92400e',
        padding: '16px 20px',
        borderRadius: '8px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '16px',
        fontWeight: '600'
      }}>
        {isCompleted ? <CheckCircle size={24} /> : <Package size={24} />}
        {isCompleted ? 'Delivery Completed' : canComplete ? 'Delivery in Progress' : 'Task Assigned'}
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Left Column */}
        <div>
          {/* Order Information */}
          {task.order && (
            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Package size={20} />
                Order Details
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Order Number</div>
                  <div style={{ fontWeight: '600', fontSize: '16px' }}>#{task.order.order_number}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Order Amount</div>
                  <div style={{ fontWeight: '600', fontSize: '18px', color: 'var(--primary-color)' }}>
                    ${parseFloat(task.order.total_amount).toFixed(2)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Order Status</div>
                  <div style={{ fontWeight: '500' }}>{task.order.status}</div>
                </div>
              </div>
            </div>
          )}

          {/* Vendor Information */}
          {task.vendor && (
            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={20} />
                Vendor (Pickup Location)
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Business Name</div>
                  <div style={{ fontWeight: '600' }}>{task.vendor.business_name}</div>
                </div>
                {task.vendor.business_phone && (
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Phone</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Phone size={16} />
                      <a href={`tel:${task.vendor.business_phone}`} style={{ color: 'var(--primary-color)' }}>
                        {task.vendor.business_phone}
                      </a>
                    </div>
                  </div>
                )}
                {task.vendor.business_address && (
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Address</div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <MapPin size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{task.vendor.business_address.street || 'Address available'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Delivery Location */}
          {task.location_end && (
            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={20} />
                Delivery Location
              </h3>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin size={20} color="var(--primary-color)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                    {task.location_end.address || 'Delivery address'}
                  </div>
                  {task.location_end.notes && (
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>
                      Note: {task.location_end.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Delivery Proof Upload */}
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Camera size={20} />
              Delivery Proof
            </h3>

            {!isCompleted && (
              <>
                {/* Upload Area */}
                <div style={{
                  border: '2px dashed #d1d5db',
                  borderRadius: '8px',
                  padding: '24px',
                  textAlign: 'center',
                  marginBottom: '16px'
                }}>
                  <Upload size={40} style={{ margin: '0 auto 12px', color: '#9ca3af' }} />
                  <p style={{ marginBottom: '12px', color: '#6b7280', fontSize: '14px' }}>
                    {uploading ? 'Uploading...' : 'Upload delivery proof'}
                  </p>
                  <label style={{
                    padding: '8px 16px',
                    background: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '6px',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    display: 'inline-block',
                    fontSize: '14px',
                    fontWeight: '600',
                    opacity: uploading ? 0.5 : 1
                  }}>
                    {uploading ? 'Uploading...' : 'Choose Photos'}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px' }}>
                    Take photos of delivered items
                  </p>
                </div>
              </>
            )}

            {/* Uploaded Photos */}
            {proofImages.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {proofImages.map((url, index) => (
                  <div key={index} style={{ position: 'relative', paddingTop: '100%' }}>
                    <img
                      src={url}
                      alt={`Proof ${index + 1}`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '6px'
                      }}
                    />
                    {!isCompleted && (
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: 'rgba(239, 68, 68, 0.9)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delivery Notes */}
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={20} />
              Delivery Notes
            </h3>
            <textarea
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              disabled={isCompleted}
              rows="4"
              placeholder="Add any notes about the delivery..."
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Action Button */}
          {canComplete && (
            <button
              onClick={completeTask}
              disabled={completing || proofImages.length === 0}
              style={{
                width: '100%',
                padding: '14px',
                background: completing || proofImages.length === 0 ? '#9ca3af' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: completing || proofImages.length === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {completing ? (
                <>
                  <Loader size={20} className="spinner" />
                  Completing...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Complete Delivery
                </>
              )}
            </button>
          )}

          {isCompleted && (
            <div style={{
              padding: '16px',
              background: '#d1fae5',
              color: '#065f46',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              <CheckCircle size={24} style={{ margin: '0 auto 8px' }} />
              Delivery Completed
              <div style={{ fontSize: '12px', fontWeight: '400', marginTop: '4px' }}>
                {new Date(task.completed_at).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}